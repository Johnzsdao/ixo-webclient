import Dashboard from 'components/Dashboard/Dashboard'
import { HeaderTab } from 'components/Dashboard/types'
import { useSelectedEntity } from 'hooks/entity'
import { Redirect, Route, useParams } from 'react-router-dom'
import { requireCheckDefault } from 'utils/images'
import { Overview } from './Overview'
import { OverviewIndividualMember } from './OverviewIndividualMember'
import { OverviewMembers } from './OverviewMembers'

const DAODashboard: React.FC = (): JSX.Element => {
  const { entityId } = useParams<{ entityId: string; groupId: string }>()
  const name = 'EducationDAO' //  TODO: from redux
  const { type } = useSelectedEntity()

  const routes = [
    {
      url: `/entity/${entityId}/dashboard/overview`,
      icon: requireCheckDefault(require('assets/img/sidebar/global.svg')),
      sdg: 'Dashboard',
      tooltip: 'Overview',
      strict: true,
    },
  ]
  const breadcrumbs = [
    {
      url: `/`,
      icon: '',
      sdg: 'Explore DAOs',
      tooltip: '',
    },
    {
      url: `/entity/${entityId}/overview`,
      icon: '',
      sdg: name,
      tooltip: '',
    },
  ]

  const tabs: HeaderTab[] = [
    {
      iconClass: `icon-dao`,
      linkClass: 'dao',
      path: '/explore',
      title: 'DAO',
      tooltip: `DAO Explorer`,
    },
    {
      iconClass: `icon-dashboard`,
      path: `/entity/${entityId}/dashboard`,
      title: 'Dashboard',
      tooltip: `DAO Management`,
    },
  ]

  return (
    <Dashboard theme='dark' title={name} subRoutes={routes} baseRoutes={breadcrumbs} tabs={tabs} entityType={type}>
      <Route exact path='/entity/:entityId/dashboard/overview' component={Overview} />
      <Route exact path='/entity/:entityId/dashboard/overview/:groupId' component={OverviewMembers} />
      <Route exact path='/entity/:entityId/dashboard/overview/:groupId/:address' component={OverviewIndividualMember} />
      <Route exact path='/entity/:entityId/dashboard'>
        <Redirect to={`/entity/${entityId}/dashboard/overview`} />
      </Route>
    </Dashboard>
  )
}

export default DAODashboard
