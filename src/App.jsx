import AdviceCard from './components/AdviceCard'

function App() {
  return (
    // Center the advice card horizontally and vertically on larger screens and add top padding on small screens
    <div className='flex items-start md:items-center justify-center min-h-screen pt-40 md:pb-40 px-4 md:px-40 lg:px-60 text-white bg-blue-950'>
     <AdviceCard />
    </div>
  )
}

export default App;
