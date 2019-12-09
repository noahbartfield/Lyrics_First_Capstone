import React, { Component } from 'react';
import { createAuthHeaders } from '../API/userManager';
import { getSongs, getSongById } from '../API/songManager';
import Header from './Header';
import SideViews from './SideView/SideViews';
import MainViews from './MainView/MainViews';
import { getUser, removeUser } from '../API/userManager';
import "./Home.css"

class Home extends Component {
  state = {
    user: getUser(),
    songs: []
  }

  logout = () => {
    this.setState({ user: null });
    removeUser();
  }

  updateSongs = () => {
    getSongs()
      .then(songs => {
        this.setState({ songs: songs });
      });
  }

  componentDidMount() {
    this.updateSongs()
  }

  render() {
    if (this.state.songs.length === 0)
    {
      return <></>
    }
    return(
    <>
    <div className="masterContainer">
      <div className="leftContainer">
        <div>
          <Header user={this.state.user} logout={this.logout}/>
        </div>
        <div>
          <SideViews
            songs={this.state.songs}
            updateSongs={this.updateSongs}
            {...this.props}
          />
        </div>
      </div>
      <div className="rightContainer">
        {/* <div>
          <MainViews />
        </div> */}
      </div>

    </div>
    </>
    )
  }

  // render() {
  //   console.log(this.state.songs)
  //   if (this.state.songs.length === 0)
  //   {
  //     return <></>
  //   }
  //     else
  //     {
  //       return(
  //       <> 
  //       <h1>Welcome to my app</h1>
  //       <ul>
  //         {
  //           <li>
  //             {this.state.songs.map(song => {
  //               return `${song.title} ${song.lyrics}`
  //             })}
  //           </li>
  //         }
  //       </ul>
  //       </>
  //       )
  //     }
    
  // }
}

export default Home;