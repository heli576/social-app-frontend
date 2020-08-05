import React,{Component} from "react";
import PropTypes from "prop-types";
import axios from "axios";
import Memory from "../components/memory/Memory";
import Grid from "@material-ui/core/Grid";
import {connect} from "react-redux";
import {getUserData} from "../redux/actions/dataActions";
import StaticProfile from "../components/profile/StaticProfile";
import MemorySkeleton from "../util/MemorySkeleton";
import ProfileSkeleton from "../util/ProfileSkeleton";

class user extends Component{
  state={
    profile:null,
    memoryIdParam:null
  }
  componentDidMount(){
    const handle=this.props.match.params.handle;
    const memoryId=this.props.match.params.memoryId;
    if(memoryId) this.setState({memoryIdParam:memoryId});

    this.props.getUserData(handle);
    axios.get(`/user/${handle}`)
    .then(res=>{
      this.setState({
        profile:res.data.user
      })
    })
    .catch(err=>console.log(err));
  }
  render(){
    const {memories,loading}=this.props.data;
    const {memoryIdParam}=this.state;
    const memoriesMarkup=loading?(
      <MemorySkeleton/>
    ):memories===null?(
      <p>No memories</p>
    ):!memoryIdParam?(
      memories.map(memory=><Memory key={memory.memoryId} memory={memory}/>)
    ):(
      memories.map(memory=>{
        if(memory.memoryId!==memoryIdParam)
        return <Memory key={memory.memoryId} memory={memory}/>
        else return <Memory key={memory.memoryId} memory={memory} openDialog/>
      })
    )
    return(
      <Grid container spacing={16}>
      <Grid item lg={4} md={4} sm={12} xs={12}>
      {this.state.profile===null?(
        <ProfileSkeleton/>
      ):(
        <StaticProfile profile={this.state.profile}/>
      )}

      </Grid>
      <Grid item lg={8} md={8} sm={12} xs={12}>
      {memoriesMarkup}
      </Grid>
      </Grid>
    )
  }
}
user.propTypes={
  getUserData:PropTypes.func.isRequired,
  data:PropTypes.object.isRequired
}
const mapStateToProps=state=>({
  data:state.data
});
export default connect(mapStateToProps,{getUserData})(user);
