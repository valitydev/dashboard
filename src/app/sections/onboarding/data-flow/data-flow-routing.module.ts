import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { BasicInfoComponent, RussianLegalOwnerComponent, RussianPrivateEntityComponent } from './forms';
import { DataFlowComponent } from './data-flow.component';
import { StepName } from './step-flow';

export const routes: Routes = [
    {
        path: '',
        component: DataFlowComponent,
        children: [
            {
                path: StepName.BasicInfo,
                component: BasicInfoComponent
            },
            {
                path: StepName.RussianPrivateEntity,
                component: RussianPrivateEntityComponent
            },
            {
                path: StepName.RussianLegalOwner,
                component: RussianLegalOwnerComponent
            }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class DataFlowRoutingModule {}
