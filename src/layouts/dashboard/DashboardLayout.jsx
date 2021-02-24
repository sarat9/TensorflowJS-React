import React from 'react'
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import TouchRipple from '@material-ui/core/ButtonBase/TouchRipple';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import Icon from '@material-ui/core/Icon';
import RouteCards from './RouteCards'


const routeCardsData = [
  { label: 'Object Detection By WebCam', path: '/objectdetectbycam', imageSrc: null },
  { label: 'Object Detection By File Upload', path: '/objectdetectupload', imageSrc: null },
  { label: 'Image Classification', path: '/imageclassification', imageSrc: null },
  { label: 'Body Segmentation', path: '/bodysegmentation', imageSrc: null },
  { label: 'Text Toxicity', path: '/texttoxicity', imageSrc: null }
]


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



function DashboardLayout() {
  const classes = useStyles();
  console.log(process.env.HHHH)
  console.log(process.env.NODE_ENV)
  
  return (
    <div className='dashboard-layout-page'>
      <span>DASHBOARD</span>
      <br /> <br />
      <Paper>
        <div className={classes.root}>
        <RouteCards routeCardsData={routeCardsData} />
        {/* <ObjectDetect /> */}
        </div>
      </Paper>
      <div />
    </div>
  )
}

export default DashboardLayout
