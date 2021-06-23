import copyImg from "../assets/images/copy.svg";
import "../styles/room-code.scss";
import toast, { Toaster } from 'react-hot-toast';

type RoomCodeProps = {
  code: string;
};

export function RoomCode(props: RoomCodeProps) {
  function copyRoomCodeToClipboard() {
    navigator.clipboard.writeText(props.code);
    toast.success('Room Code copied to clipboard')
  }

  return (
    <button className="room-code" onClick={copyRoomCodeToClipboard}>
      <div>
        <img src={copyImg} alt="Copy room code to clipboard" />
      </div>
      <span>#{props.code}</span>
    </button>
  );
}
