import Clock from 'components/Clock/Clock'
import Toolbar from 'components/Toolbar/Toolbar'

const Home = () => {
  return (
    <div className='font-mono min-h-screen dark:bg-gray-900 dark:text-gray-400 antialiased'>
      <Toolbar>
        <Clock />
      </Toolbar>
    </div>
  )
}

export default Home
