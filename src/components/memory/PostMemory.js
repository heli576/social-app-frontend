import React,{Component,Fragment} from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import MyButton from "../../util/MyButton";
//Redux
import {connect} from "react-redux";
import {postMemory,clearErrors} from "../../redux/actions/dataActions";

//MUI core
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from "@material-ui/core/CircularProgress";
import AddIcon from "@material-ui/icons/Add";
import CloseIcon from "@material-ui/icons/Close";

const styles=theme=>({
  ...theme.spreadThis,
  submitButton:{
    position:"relative",
    float:"right",
    marginTop:10
  },
  progressSpinner:{
    position:"absolute"
  },
  closeButton:{
    position:"absolute",
    left:"91%",
    top:"6%"
  }
})


class PostMemory extends Component{
  state={
    open:false,
    body:"",
    errors:{}
  };
  componentWillReceiveProps(nextProps){
    if(nextProps.UI.errors){
      this.setState({
        errors:nextProps.UI.errors
      });
    };
    if(!nextProps.UI.loading && !nextProps.UI.errors){
      this.setState({body:"",open:false,errors:{}});

    }
  }
  handleOpen=()=>{
    this.setState({open:true})
  };
  handleClose=()=>{
    this.props.clearErrors();
    this.setState({open:false,errors:{}})
  };
  handleChange=(event)=>{
    this.setState({[event.target.name]:event.target.value})
  };
  handleSubmit=(event)=>{
    event.preventDefault();
    this.props.postMemory({body:this.state.body});
  };
  render(){
  const {errors}=this.state;
  const {classes,UI:{loading}}=this.props;
    return(
      <Fragment>
      <MyButton onClick={this.handleOpen} tip="Post a Memory!">
<AddIcon/>
      </MyButton>
      <Dialog
      open={this.state.open} onClose={this.handleClose} fullWidth maxWidth="sm">
      <MyButton tip="Close" onClick={this.handleClose} tipClassName={classes.closeButton}>
<CloseIcon/>
      </MyButton>
      <DialogTitle>
      Post a New Memory
      </DialogTitle>
      <DialogContent>
      <form onSubmit={this.handleSubmit}>
      <TextField
      name="body"
      type="text"
      label="MEMORY!!"
      multiline
      rows="3"
      placeholder="Share your fond memory"
      error={errors.body?true:false}
      helperText={errors.body}
      className={classes.textField}
      onChange={this.handleChange}
      fullWidth
      />
  <Button type="submit" variant="contained" color="primary" className={classes.submitButton} disabled={loading}>
Post
{loading && (
  <CircularProgress size={30} className={classes.progressSpinner}/>
)}

</Button>
</form>
      </DialogContent>

      </Dialog>
      </Fragment>
    )
  }
}
PostMemory.propTypes={
  postMemory:PropTypes.func.isRequired,
  clearErrors:PropTypes.func.isRequired,
  UI:PropTypes.object.isRequired
};
const mapStateToProps=(state)=>({
  UI:state.UI
})


 export default connect(mapStateToProps,{postMemory,clearErrors})(withStyles(styles)(PostMemory));
