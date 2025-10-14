import Addnote from './Addnote'
import Notes from './Notes'


const Home = (props) => {
 const {showAlert} = props;

  return (
    <div className='mt-5 pt-4 '>
      <Addnote  />
      <Notes showAlert={showAlert}/>
    </div>
  )
}

export default Home
