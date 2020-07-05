import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Project } from "@app/core/models/project.model";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ProjectService } from "@app/core/services/project.service";
import { Router } from "@angular/router";
import { first } from "rxjs/operators";

export interface updateForm {
  defaultend: string;
}

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.scss"],
})
export class UpdateComponent implements OnInit {
  project: Project;
  editForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private router: Router,
    private pService: ProjectService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      console.log(params.get("id"));
      let id = params.get("id");
      if (!id) {
        this.router.navigate(["/"]);
        return;
      }
      this.pService.get(+id).subscribe((data: any) => {
        console.log(data);
        let d = data.data;
        let c = {
          project_title: d.project_title,
          description: d.description,
          responsible_person: d.responsible_person,
          link: d.link,
          link_method: d.link_method,
          payout_type: d.payout_type,
          max_payout: d.max_payout,
          exp_payout: d.exp_payout,
          desired_sample_size: d.desired_sample_size,
          desired_num_invitations: d.desired_num_invitations,

          name: d.name,
          id: d.id,
          defaultend: new Date(d.defaultend),
        };
        console.log(c);
        this.editForm.patchValue(c);
      });
    });
    this.editForm = this.formBuilder.group({
      id: [""],
      project_title: ["", Validators.required],
      description: [""],
      responsible_person: [""],
      link: [""],
      link_method: [""],
      max_payout: [""],
      exp_payout: [""],
      desired_sample_size: [""],
      desired_num_invitations: [""],
      payout_type: [""],
      defaultend: [""],
    });
  }

  onSubmit() {
    this.editForm.value.defaultend = new Date(this.editForm.value.defaultend);
    this.pService
      .update(this.editForm.value)
      .pipe(first())
      .subscribe(
        (data) => {
          if (data.status === 200) {
            alert("User updated successfully.");
            this.router.navigate(["list-user"]);
          } else {
            alert(data.message);
          }
        },
        (error) => {
          alert(error);
        }
      );
  }
}