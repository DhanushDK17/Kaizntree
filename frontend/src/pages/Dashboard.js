// DashboardPage.js
import { useState } from 'react';
import { Container, Grid, ListItem, ListItemButton, ListItemText } from '@mui/material';
import { ItemsDashboard } from '../components/ItemsDashboard';
import { Stock } from '../components/Stock';
import { Builds } from '../components/Builds';
import { Customers } from '../components/Customers';
import { SalesAndOrders } from '../components/SalesAndOrders';
import { Suppliers } from '../components/Suppliers';
import { Manufacturers } from '../components/Manufacturers';
import { PurchaseOrders } from '../components/PurchaseOrders';
import { Reports } from '../components/Reports';
import { Home } from '../components/Home'

export const Dashboard = () => {
    const [currentTab, setCurrentTab] = useState("Items")

    const tabs = [
        {label: "Home", component: <Home/>}, 
        {label:"Items", component: <ItemsDashboard/>}, 
        {label: "Stock", component: <Stock/>}, 
        {label: "Build", component: <Builds/>}, 
        {label: "Customers", component: <Customers/>}, 
        {label: "Sales Orders", component: <SalesAndOrders/>}, 
        {label: "Suppliers", component: <Suppliers/>},
        {label: "Manufacterers", component: <Manufacturers/>}, 
        {label: "Purchase Orders", component: <PurchaseOrders/>}, 
        {label: "Reports", component: <Reports/>}
    ]


  return (
    <Container maxWidth="xxl" sx={{height: "100%", m: 0, p: 0}}>
        <Grid container sx={{height: "100%"}}>
            <Grid item xs={1} sx={{
              borderRight: "5px solid lightblue",
            }}>
              { tabs.map((tab, index) => 
                <ListItem key={index} component="div"
                  onClick={() => setCurrentTab(tab.label)}
                  sx={{
                    borderRadius: 1, 
                    backgroundColor: currentTab === tab.label ? "secondary.main" : ""}} disablePadding>
                  <ListItemButton>
                    <ListItemText primary={tab.label} />
                  </ListItemButton>
                </ListItem>
              )}
            </Grid>
            <Grid item xs={11}>
              {tabs.map((tab, index) => 
                {
                  return currentTab === tab.label ? tab.component : <></>
                }
              )}
            </Grid>
        </Grid>
    </Container>
  );
};