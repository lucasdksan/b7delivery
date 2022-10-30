import MailSent from "./EmailIcon.svg";

type Props = {
    icon: string;
    color: string;
    width: number;
    height: number;
}

const Icon = ({ color, height, icon, width }:Props)=>{
    return(
        <div style={{width, height}}>
            {icon === "mailSent" && <MailSent color={color}/>}
        </div>
    );
}

export default Icon;