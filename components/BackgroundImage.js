// Easily crops images
export default function BackgroundImage(props) {
  return (
	  <div className={`bg-img ${props.className || ''}`} style={{backgroundImage: `url(${props.src})`, ...props.style}}/>
  )
}