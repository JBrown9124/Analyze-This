import logo from './logo.svg';
import './App.css';
import React, {useState} from 'react';
import "./sections/Welcome.css"
import "./sections/FeelSafe.css"
import Welcome from './sections/Welcome'
import WelcomeTransition from './animators/WelcomeTransition'
import SignIn from './sections/SignIn'
import Location from './sections/Location'
import Name from './sections/Name'
import FeelSafe from './sections/FeelSafe'
function App() {
  const [name, setName] = useState("")
  const [conflict, setConflict] = useState("")
  const [location, setLocation] = useState({})
  const [toggle, set] = useState(false);
  const nameChange = (nameInput:string):void =>{
    /*Tell welcome transition to go to the next section then set the name input to our name state */
    set(!toggle);
    setName(nameInput);
  }
  const locationChange = (locationInput:object):void =>{
    set(!toggle);
    setLocation(locationInput)
  }
  return (
 <>


<WelcomeTransition
// handleName={(props:string)=>setName(props)}
        isClicked={toggle}
        child1={<FeelSafe click={() => set(!toggle)} />}
        child2={<SignIn click={() => set(!toggle)} />}
        child3={<Name handleName={(props) => nameChange(props)}/>}
        child4={<Location handleLocation={(props) => locationChange(props)}/>}
      />
</>
  );
}

export default App;
