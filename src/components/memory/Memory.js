import React,{Component} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import Typography from "@material-ui/core/Typography";
import {Link} from "react-router-dom";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";
import DeleteMemory from "./DeleteMemory";
import MemoryDialog from "./MemoryDialog";
import LikeButton from "./LikeButton";
// MUI Stuff
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
//Icons
import ChatIcon from "@material-ui/icons/Chat";


import {connect} from "react-redux";

const styles=theme=>({
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
  image:{

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
  content:{
    [theme.breakpoints.down('sm')]: {
      padding:25,
    objectFit:"cover",

 },
 [theme.breakpoints.up('md')]: {
   padding:25,
 objectFit:"cover",
 }


}


});
class Memory extends Component{

  render(){
    dayjs.extend(relativeTime);
    const {classes,memory:{body,createdAt,userImage,userName,memoryId,likeCount,commentCount},user:{authenticated,credentials:{handle}}}=this.props;

      const deleteButton=authenticated && userName===handle?(
        <DeleteMemory memoryId={memoryId}/>
      ):null;
return(
    <Card className={classes.card}>
    <CardMedia image={userImage}
    title="Profile image"
    className={classes.image}/>
    <CardContent className={classes.content}>
    <Typography variant="h5" component={Link} to={`/users/${userName}`} color="primary">{userName}</Typography>
    {deleteButton}
    <Typography variant="body2" color="textSecondary">{dayjs(createdAt).fromNow()}</Typography>
    <Typography variant="body1">{body}</Typography>
    <LikeButton memoryId={memoryId}/>
    <span>{likeCount} Likes</span>

    <MyButton tip="comments">
    <ChatIcon color="primary"/>
    </MyButton>
    <span>{commentCount} Comments</span>

    <MemoryDialog memoryId={memoryId} userName={userName} openDialog={this.props.openDialog}/>
    </CardContent>
    </Card>
    )
  }


}
Memory.propTypes={
user:PropTypes.object.isRequired,
  memory:PropTypes.object.isRequired,
  classes:PropTypes.object.isRequired,
  openDialog:PropTypes.bool
}
const mapStateToProps=state=>({
  user:state.user
})

export default connect(mapStateToProps)(withStyles(styles)(Memory));
