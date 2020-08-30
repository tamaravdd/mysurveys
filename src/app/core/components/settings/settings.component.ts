import { Component, OnInit } from "@angular/core";
import { AdminService } from "@app/core/services/admin.service";
import { Project } from "@app/core/models/project.model";
import { ProjectService } from "@app/core/services/project.service";
import { AlertService } from "../_alert";
import { Router } from "@angular/router";

@Component({
  selector: "app-settings",
  templateUrl: "./settings.component.html",
  styleUrls: ["./settings.component.scss"],
})
export class SettingsComponent implements OnInit {
  constructor(
    private router: Router,
    private alertService: AlertService,
    private pService: ProjectService,
    private adminService: AdminService
  ) {}
  settings: any;
  resultArray = [];
  projects = [];

  ngOnInit(): void {
    this.adminService.getSettings().subscribe((r) => {
      console.log(r);
      this.settings = r.data;
      // this.resultArray = Object.keys(r.data).map(function (i) {
      //   let data = r.data[i];
      //   return data;
      // });
      // this.settings = this.resultArray[0];
    });
    this.getProjects();
  }

  getProjects() {
    this.pService.getAll().subscribe((projects: any) => {
      this.projects = projects.data;
    });
  }

  update(project, quota) {
    let p = { ...project };
    p.quota = quota ? quota : 0;
    console.log(p);
    this.pService.update(p).subscribe(
      (data) => {
        console.log(data);
        if (data.success) {
          this.alertService.success("Updated successfully", {
            autoClose: true,
          });
          this.pService.getAll().subscribe((data: any) => {
            this.projects = data.data;
          });
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
