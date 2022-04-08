import { useState } from "react";
import "./App.css";
import app from "./firebase.init";
import { getAuth, GithubAuthProvider, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

const auth = getAuth(app);

function App() {
  const [user, setUser] = useState("");
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();
  const handleGoogleSignIn = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const handleSignOut = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        /* সাইন আউট ‍একসন */
        setUser({});
      })
      .catch((error) => {
        setUser({});
      });
  };
  const handleGithubSignIn = () =>{
    signInWithPopup(auth, githubProvider)
    .then(result =>{
      const user = result.user;
      setUser(user);
      console.log(user)
    })
    .catch(error => {
      console.error(error);
    })
  }
  return (
    <div className="App">
      {/* কিন্ডিসনাল রেন্ডারিং টার্নারী অপারেটর */}
      {
        user.email ?
        <> 
        <button onClick={handleSignOut}> Sign Out</button>
        </> :
        <>
        <button onClick={handleGoogleSignIn}> Google Sign In </button>
        <button onClick={handleGithubSignIn} >Github sign in</button>
        </>
      }
      <h2>Name : <i>{user.displayName}</i></h2>
      <h2>e-Mail : <i>{user.email}</i></h2>
      Photo: <img src={user.photoURL} alt="img" />
    </div>
  );
}
export default App;
