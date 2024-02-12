import React, { useEffect, useState } from 'react';
import { Container,
    Grid, Button,
    Paper, Table, Stack,
    TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, 
    Accordion, AccordionDetails, AccordionSummary, Typography, Divider, Badge, TextField, CircularProgress } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { StatCard } from './StatCard';
import { item } from '../api/items'
import { CreateNewCategory } from './CreateNewCategory';

export const ItemsDashboard = () => {
    const [data, setData] = useState([])
    const [showCreateCategoryDialog, setShowCreateCategoryDialog] = useState(false)
    const openCreateCategoryDialog = () => {
        setShowCreateCategoryDialog(true)
      }
  
      const closeCreateCategoryDialog = () => {
        setShowCreateCategoryDialog(false)
      }
    useEffect(() => {
        item.fetchItems({page: 1, count: 2})
        .then((data) => {
            setData(data)
            setLoading(false)
        })
    }, [])
    const [loading, setLoading] = useState(true)
    const createStockStatus = (inStock, availableStock) => {
        return <TableCell sx={{textAlign: 'center'}}>
                <Stack direction="row" alignItems="center" justifyContent="space-around">
                    {inStock ? 
                        <Badge variant='dot' color="success" badgeContent={""} sx={{mr: 2}} /> :
                        <Badge variant='dot' color="error" badgeContent={""} />
                    }
                    <Typography>{availableStock}</Typography>
                </Stack>
            </TableCell>
      };
    const headers = [
        {label: "SKU", key: "SKU" }, 
        {label: "Name", key: "name"}, 
        {label: "Tags", key:"tags"}, 
        {label: "Category", key:"category"}, 
        {label: "In Stock", key: "stock_status"}, 
        {label: "Available Stock", key:"available_stock"}
    ]
    // Dummy data for the table, replace with actual data from your backend
    
    return <Container maxWidth="xxl" sx={{overflowY: "scroll", height: "100%"}}>
        <Grid direction="row" container spacing={3} sx={{mt: 0, p: 3}}>
            <Grid direction="column" container xs={6}>
                <Grid item>
                    <Typography variant='h4'>Item Dashboard</Typography>
                </Grid>
                <Grid item>
                    <Typography sx={{color: "gray"}} variant='subtitle1'>All items</Typography>
                </Grid>
            </Grid>
            <Grid direction="column" container xs={6}>
                <Grid item xs={12} sm={6} md={3}>
                    <StatCard type="category" title="Total Categories" value="4" />
                </Grid>
                <Divider/>
                <Grid item xs={12} sm={6} md={3}>
                <StatCard type="items" title="Total Items" value="21" />
                </Grid>
            </Grid>
            <Grid item>
                <Button variant='contained' onClick={openCreateCategoryDialog}>NEW ITEM CATEGORY</Button>
            </Grid>
        <Grid item xs={12}>
        <Accordion>
            <AccordionSummary
                sx={{backgroundColor: "lightgray", borderRadius: 1}}
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1-content"
                id="panel1-header"
                >
                    # Subcategories
            </AccordionSummary>
            <AccordionDetails sx={{height: "40%"}}>
                {loading ? <CircularProgress/> :
                <>
                    <Grid container direction="row" justifyContent={"space-between"} spacing={2} sx={{px: 2, py: 3}}>
                        <Grid container xs={6}>
                            <Grid item sx={{mr: 2}}>
                                <Button variant='contained'>NEW ITEM</Button>
                            </Grid>
                            <Grid item>
                                <Button color='secondary' disabled variant='contained'>OPTIONS</Button>
                            </Grid>
                        </Grid>
                        <Grid container xs={6} justifyContent={"space-around"} alignItems={"center"}>
                            <Grid item xs={9} sx={{mr: 1}}>
                                <TextField sx={{width: "100%"}} id="search" placeholder="Search" variant="standard" />
                            </Grid>
                            <Grid item xs={2}>
                                <Button color='secondary' disabled variant='contained'>OPTIONS</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>                                    
                                <TableRow>
                                    <TableCell><Checkbox /></TableCell>
                                    {headers.map(header => <TableCell sx={{fontWeight: "bold", color: "gray", textAlign: 'center'}}>{header.label}</TableCell>)}
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {
                                    data.map((item) => (
                                        <TableRow key={item.sku}>
                                            <TableCell><Checkbox /></TableCell>
                                            {headers.slice(0, 4).map(({_, key}) => 
                                            <TableCell sx={{textAlign: 'center'}}>{item[key]}</TableCell>)}
                                            {createStockStatus(item['stock_status'], item['available_stock'])}
                                            {createStockStatus(item['stock_status'], item['available_stock'])}
                                        </TableRow>
                                    ))
                                }
                            </TableBody>
                        </Table>
                    </TableContainer>
                </>
                }
            </AccordionDetails>
        </Accordion>
        </Grid>
        </Grid>
        <CreateNewCategory open={ showCreateCategoryDialog } handleClose={closeCreateCategoryDialog}/>
    </Container>
}