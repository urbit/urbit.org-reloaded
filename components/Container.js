export default function Container({children}) {
	return (
	  <div className='flexmin-h-screen w-screen justify-center'>
		<div className='flex flex-col w-full max-w-screen-2xl'>
		  {children}
		</div>
	  </div>
	)
  }