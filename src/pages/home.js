import React,{Component} from "react";
import Grid from "@material-ui/core/Grid";
import PropTypes from "prop-types";
import Memory from "../components/memory/Memory";
import Profile from "../components/profile/Profile";
import MemorySkeleton from "../util/MemorySkeleton";

import {connect} from "react-redux";
import {getMemories} from "../redux/actions/dataActions";
class home extends Component {
componentDidMount(){
  this.props.getMemories();
  }
  render(){
    const {memories,loading}=this.props.data;
    let recentMemoriesMarkup=!loading?(

    memories.map((memory)=><Memory key={memory.memoryId} memory={memory}/>)

  ):(<MemorySkeleton/>);
    return(
    <Grid container spacing={16}>
    <Grid item lg={4} md={4} sm={12} xs={12}>
    <Profile/>
    </Grid>
    <Grid item lg={8} md={8} sm={12} xs={12}>
  {recentMemoriesMarkup}
    </Grid>


    </Grid>
    );
  }
}
home.propTypes={
  getMemories:PropTypes.func.isRequired,
  data:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
  data:state.data
})
export default connect(mapStateToProps,{getMemories})(home);
