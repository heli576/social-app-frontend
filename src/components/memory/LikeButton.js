import React,{Component} from "react";
import MyButton from "../../util/MyButton";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";
//icons
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorder from "@material-ui/icons/FavoriteBorder";
//Redux
import {connect} from "react-redux";
import {likeMemory,unlikeMemory} from "../../redux/actions/dataActions";
export class LikeButton extends Component{
  likedMemory=()=>{
    if(this.props.user.likes && this.props.user.likes.find(like=>like.memoryId===this.props.memoryId))
    return true;
    else return false;
  };
  likeMemory=()=>{
    this.props.likeMemory(this.props.memoryId);
  };
  unlikeMemory=()=>{
    this.props.unlikeMemory(this.props.memoryId);
  };

  render(){
    const {authenticated}=this.props.user;
    const likeButton=!authenticated?(
<Link to ="/login">
      <MyButton tip="Like">
      <FavoriteBorder color="primary"/>
        </MyButton>
        </Link>

    ):this.likedMemory()?(
        <MyButton tip="Undo like" onClick={this.unlikeMemory}>
        <FavoriteIcon color="primary"/>
        </MyButton>
      ):(
        <MyButton tip="Like" onClick={this.likeMemory}>
        <FavoriteBorder color="primary"/>
        </MyButton>
      );
    return likeButton;
    }
}
LikeButton.propTypes={
  likeMemory:PropTypes.func.isRequired,
  unlikeMemory:PropTypes.func.isRequired,
  user:PropTypes.object.isRequired,
  memoryId:PropTypes.string.isRequired
};
const mapStateToProps=(state)=>({
  user:state.user
})
const mapActionsToProps={
  likeMemory,
  unlikeMemory
}

export default connect(mapStateToProps,mapActionsToProps)(LikeButton);
