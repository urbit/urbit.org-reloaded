export default function Container({children}) {
	return (
	  <div className='flex p-2 min-h-screen w-screen justify-center'>
		<div className='flex flex-col w-full max-w-screen-2xl'>
		  {children}
		</div>
	  </div>
	)
  }