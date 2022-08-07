import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { DATA_PERMISSION } from "src/app/_shared/utils/constant";
import { NgxPermissionsGuard } from "ngx-permissions";
import { TestIndexComponent } from "./components/test-index/test-index.component";

const routes: Routes = [
  {
    path: '',
    component: TestIndexComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class TestRoutingModule {}
