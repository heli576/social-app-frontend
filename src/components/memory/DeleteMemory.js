import React,{Component,Fragment} from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import MyButton from "../../util/MyButton";

//MUI Stuff
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DeleteOutline from "@material-ui/icons/DeleteOutline";

//Redux
import {connect} from "react-redux";
import {deleteMemory} from "../../redux/actions/dataActions";

const styles=theme=>({
  deleteButton:{
    [theme.breakpoints.down('xs')]: {
      position:"absolute",
      left:"85%",
      top:"10%"
    },
    [theme.breakpoints.up('md')]: {
      position:"absolute",
      left:"90%",
      top:"10%"
    },

  }
});

class DeleteMemory extends Component{
  state={
    open:false
  };
  handleOpen=()=>{
    this.setState({open:true});
  };
  handleClose=()=>{
    this.setState({open:false});
  };
  deleteMemory=()=>{
    this.props.deleteMemory(this.props.memoryId);
    this.setState({open:false});
  };
  render(){
    const {classes}=this.props;
    return(
      <Fragment>
      <MyButton tip="Delete Memory" onClick={this.handleOpen} btnClassName={classes.deleteButton}>
<DeleteOutline color="secondary"/>
      </MyButton>
      <Dialog
      open={this.state.open}
      onClose={this.handleClose}
      fullWidth
      maxWidth="sm">
      <DialogTitle>
      Are you sure you want to delete this memory?
      </DialogTitle>
      <DialogActions>
      <Button onClick={this.handleClose} color="primary">
      Cancel
      </Button>
      <Button onClick={this.deleteMemory} color="secondary">
      Delete
      </Button>
      </DialogActions>
      </Dialog>
      </Fragment>
    );
  }
}
DeleteMemory.propTypes={
  deleteMemory:PropTypes.func.isRequired,
  classes:PropTypes.object.isRequired,
  memoryId:PropTypes.string.isRequired
}
export default connect(null,{deleteMemory})(withStyles(styles)(DeleteMemory));
