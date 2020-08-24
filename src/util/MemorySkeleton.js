import React,{Fragment} from "react";
import NoImg from "../images/no-img.png";
import PropTypes from "prop-types";

//MUI Stuff
import Card from "@material-ui/core/Card";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";

import withStyles from "@material-ui/core/styles/withStyles";

const styles=theme=>({
  ...theme.spreadThis,
  card:{
    [theme.breakpoints.down('xs')]: {
      position:"relative",
      display:"flex",
      marginTop: 20,
 marginLeft:10,
 marginRight:10,


    },
    [theme.breakpoints.up('sm')]: {
      position:"relative",
      display:"flex",
       marginBottom: 20,
       marginRight:60,
       marginLeft:60
    },
  [theme.breakpoints.up('md')]: {
    position:"relative",
    display:"flex",
     marginBottom: 20,
     marginRight:100
    }

  },
  cardContent:{
    width:"100%",
    flexDirection:"column",
    padding:25
  },
  cover:{
    [theme.breakpoints.down('xs')]: {
    width:80,
    height:65,
    borderRadius:"50%",
    marginTop:20,
    marginLeft:20
    },
    [theme.breakpoints.up('sm')]: {
    minWidth:150,
    },
  [theme.breakpoints.up('md')]: {
      minWidth:200,
    }
  },
  handle:{
    width:60,
    height:18,
    backgroundColor:theme.palette.primary.main,
    marginBottom:7
  },
  date:{
    height:14,
    width:100,
    backgroundColor:"rgba(0,0,0,0.3)",
    marginBottom:10
  },
  fullLine:{
    height:15,
    width:"90%",
    marginBottom:10,
    backgroundColor:"rgba(0,0,0,0.6)"
  },
  halfLine:{
    height:15,
    width:"50%",
    marginBottom:10,
    backgroundColor:"rgba(0,0,0,0.6)"
  }
});

const MemorySkeleton=(props)=>{
  const {classes}=props;
  const content=Array.from({length:5}).map((item,index)=>(
    <Card className={classes.card} key={index}>
    <CardMedia className={classes.cover} image={NoImg}/>
    <CardContent className={classes.cardContent}>
<div className={classes.handle}/>
<div className={classes.date}/>
<div className={classes.fullLine}/>
<div className={classes.fullLine}/>
<div className={classes.halfLine}/>
    </CardContent>
    </Card>
  ))
  return <Fragment>{content}</Fragment>
}

MemorySkeleton.propTypes={
  classes:PropTypes.object.isRequired
};

export default withStyles(styles)(MemorySkeleton);
