import React from 'react'
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom'
import NavBar from '../../components/navbar/NavBar'
import DashboardLayout from '../dashboard/DashboardLayout'

function HomeLayout() {
  return (
    <div className='home-page-layout'>
      <NavBar>
        <div>
          <Switch>
            {/* <Route path='/profile/ss' component={VenturesLayout} /> */}
            {/* <Route path='/profile' component={ProfileLayout} />
            <Route path="/ventures/:ventureId" component={VentureLayout} />
            <Route path='/ventures' component={VenturesLayout} />
            <Route path='/companies' component={CompaniesLayout} />
            <Route path="/products/:id" component={ProductLayout} />
            <Route path='/products' component={ProductsLayout} /> */}
            <Route exact path='/' component={DashboardLayout} />
          </Switch>
        </div>
      </NavBar>
    </div>
  )
}

export default HomeLayout