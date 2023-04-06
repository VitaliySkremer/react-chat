import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";

interface IMessageProps {
  photo:string,
  name:string,
  text:string,
  isYour:boolean
}

export const Message = ({photo, name, text, isYour}:IMessageProps) => {
  return (
    <div className={['message__wrapper',isYour?'message__your':''].join(' ')}>
      <Avatar className="message__wrapper-avatar" alt="Avatar" src={photo} />
      <div>
        <Typography fontSize={16} variant="h6">
          {name}
        </Typography>
        <Typography variant="h6">
          {text}
        </Typography>
      </div>
    </div>
  )
}