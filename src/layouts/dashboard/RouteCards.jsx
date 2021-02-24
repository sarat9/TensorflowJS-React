import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import ButtonBase from '@material-ui/core/ButtonBase';
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import './Dashboard.scss'

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        padding: "50px 0px 20px 0px"
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }
}));

// const defaultImage = require("./../../assets/images/moneywings.png")

function RouteCards(props) {
    const classes = useStyles();
    const { defaultImage, routeCardsData } = props;
    var history = useHistory();

    const navigateToPage = (path) => {
        history.push(path)
    }

    return (
        <div className='dashboard-route-cards-page'>
            <Grid container spacing={2}>
                {routeCardsData && routeCardsData.map((routeInfo, index) => {
                    return (
                        <Grid key={index} item className='cardBanner' md={3} sm={6} xs={12}>

                            
                            <Card className={classes.root} >
                                <CardActionArea onClick={() => { navigateToPage(routeInfo.path) }}>
                                    <CardMedia
                                    className={classes.media}
                                    image="/static/images/cards/contemplative-reptile.jpg"
                                    title="Contemplative Reptile"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="h2">
                                        {routeInfo.label}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary" component="p">
                                       Tensorflow.js with react
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                                <CardActions>
                                    <Button size="small" color="primary">
                                    Share
                                    </Button>
                                    <Button size="small" color="primary">
                                    Learn More
                                    </Button>
                                </CardActions>
                            </Card>
                            
                            
                            {/* <Paper key={index} elevation={3} className='cardBannerContent' onClick={() => { navigateToPage(routeInfo.path) }}>
                                <>
                                    <div className='cardBannerImageDiv'>
                                    </div>
                                    <div className="cardInfo">
                                        <h1> {routeInfo.label}</h1>
                                    </div>
                                </>
                            </Paper> */}


                        </Grid>
                    )
                })
                }
            </Grid>
        </div>
    )
}

RouteCards.defaultProps = {
    defaultImage: ''
}


export default RouteCards
