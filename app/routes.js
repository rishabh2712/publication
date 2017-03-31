import React from 'react';
import { Route, IndexRoute } from 'react-router';
import Home from './home/components/Home';
import ChangePassword from './home/components/ChangePassword'
import Tabs from './home/components/Tabs';
import Login from './login/components/Login';
import ProjectList from './showcase/components/containers/ProjectList';
import AddProject from './addproject/components/containers/AddProject';
import AddTeam from './addproject/components/containers/AddTeam';
import PublicationContent from './publicationdetails/components/containers/PublicationContent';
import EditPublicationContent from './publicationdetails/components/containers/PublicationContentEdit';
import PublicationContributorsEdit from './publicationdetails/components/containers/PublicationContributorsEdit';
import PDFViewer from './home/components/PDFViewer';
import InsightList from './showcase/components/containers/InsightList';
import InsightShowcase from './showcase/components/InsightShowcase';
import AddInsight from './showcase/components/AddInsight';
import AdminContainer from './admin/components/containers/Admin.js'

export default
<Route path="/publications">
  <Route component={Home}>
    <Route component={Tabs}>
      <IndexRoute component={ProjectList}/>
      <Route path="/publications" component={ProjectList}/>
      <Route path="/insights" component={InsightList}/>
      <Route path="/insights/add" component={AddInsight}/>
    </Route>
    <Route path="/publications/add" component={AddProject}/>
    <Route path="/publications/addTeam" component={AddTeam}/>
    <Route path="/publications/publication/:id" component={PublicationContent}/>
    <Route path="/publications/publication/:id/edit" component={EditPublicationContent}/>
    <Route path="/publications/publication/:id/edit/contributors" component={PublicationContributorsEdit}/>
    <Route path="/admin" component={AdminContainer}/>
  </Route>
  <Route path="/login" component={Login}/>
</Route>
