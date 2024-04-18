import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AllergensPage } from './pages/allergens/allergens.page';
import { Tab1Page } from './tab1/tab1.page';

const routes: Routes = [
  {
    path: '',
    component:Tab1Page,
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'allergens',
    component: AllergensPage,
    loadChildren: () => import('./pages/allergens/allergens.module').then( m => m.AllergensPageModule)
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
