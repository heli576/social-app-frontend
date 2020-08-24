import React,{Component,Fragment} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
import dayjs from "dayjs";
import {Link} from "react-router-dom";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import CommentForm from "./CommentForm";

//MUI Stuff
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";
//Icon
import CloseIcon from "@material-ui/icons/Close";
import UnfoldMore from "@material-ui/icons/UnfoldMore";
import ChatIcon from "@material-ui/icons/Chat";
//Redux stuff
import {connect} from "react-redux";
import {getMemory,clearErrors} from "../../redux/actions/dataActions";
const styles=theme=>({
...theme.spreadThis,
profileImage:{
  maxWidth:200,
  height:200,
  borderRadius:"50%",
  objectFit:"cover"
},
dialogContent:{
  padding:20
},
closeButton:{
  [theme.breakpoints.down('xs')]: {
    position:"absolute",
    left:"80%",
    marginTop:4
  },
  [theme.breakpoints.up('sm')]: {
    position:"absolute",
    left:"90%",
    marginTop:4
  },
[theme.breakpoints.up('md')]: {
  position:"absolute",
  left:"90%",
  marginTop:4
  }
},
expandButton:{
  [theme.breakpoints.down('xs')]: {
    position:"absolute",
    left:"80%"
  },
  [theme.breakpoints.up('md')]: {
    position:"absolute",
    left:"90%"
  },

},
spinner:{
  textAlign:"center",
  marginTop:50,
  marginBotton:50
}
});
class MemoryDialog extends Component{
  state={
    open:false,
    oldPath:"",
    newPath:""
  };
  componentDidMount(){
    if(this.props.openDialog){
      this.handleOpen();
    }
  }
  handleOpen=()=>{
    let oldPath=window.location.pathname;
    const {userName,memoryId}=this.props;
    const newPath=`/users/${userName}/memory/${memoryId}`;
    if(oldPath===newPath)oldPath=`/users/${userName}`;
    window.history.pushState(null,null,newPath);
    this.setState({open:true,oldPath,newPath});
    this.props.getMemory(this.props.memoryId);
  }
  handleClose=()=>{
    window.history.pushState(null,null,this.state.oldPath);
    this.setState({open:false});
    this.props.clearErrors();
  }
  render(){
    const {classes,memory:{memoryId,body,createdAt,likeCount,commentCount,userImage,userName,comments},UI:{loading}}=this.props;
const dialogMarkup=loading?(
  <div className={classes.spinner}>
  <CircularProgress size={50} thickness={2}/>
  </div>
):(
  <Grid container spacing={16}>
  <Grid item sm={5}>
  <img src={userImage} alt="Profile" className={classes.profileImage}/>
  </Grid>
  <Grid item sm={7}>
  <Typography
  component={Link}
  color="primary"
  variant="h5"
  to={`/users/${userName}`}
  >
  @{userName}
  </Typography>
  <hr className={classes.invisibleSeparator}/>
  <Typography variant="body2" color="textSecondary">
  {dayjs(createdAt).format("h:mm a,MMM DD YYYY")}
  </Typography>
  <hr className={classes.invisibleSeparator}/>
  <Typography variant="body1">
  {body}
  </Typography>
  <LikeButton memoryId={memoryId}/>
  <span>{likeCount} Likes</span>
  <MyButton tip="comments">
  <ChatIcon color="primary"/>
  </MyButton>
  <span>{commentCount} Comments</span>
  </Grid>
  <hr className={classes.visibleSeparator}/>
  <CommentForm memoryId={memoryId}/>
  <Comments comments={comments}/>
  </Grid>
);
    return(
<Fragment>
<MyButton onClick={this.handleOpen} tip="Expand Memory" tipClassName={classes.expandButton}>
<UnfoldMore color="primary"/>
</MyButton>
<Dialog
  open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
  <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
<CloseIcon/>
  </MyButton>
  <DialogContent className={classes.dialogContent}>
  {dialogMarkup}
  </DialogContent>
  </Dialog>
</Fragment>
);
  }
}
MemoryDialog.propTypes={
  clearErrors:PropTypes.func.isRequired,
  getMemory:PropTypes.func.isRequired,
  memoryId:PropTypes.string.isRequired,
  userName:PropTypes.string.isRequired,
  memory:PropTypes.object.isRequired,
  UI:PropTypes.object.isRequired
}
const mapStateToProps=(state)=>({
  memory:state.data.memory,
  UI:state.UI
})
const mapActionsToProps={
  getMemory,
  clearErrors
};
export default connect(mapStateToProps,mapActionsToProps)(withStyles(styles)(MemoryDialog));
