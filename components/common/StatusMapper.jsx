export default function StatusBadge({status}) {
    let text = "";
    switch (status) {
        case "ready":
            text = "ถึงคิวแล้ว";
            break;
        case "preparing":
            text = "กำลังจัดเตรียม";
            break;
        case "waiting":
            text = "อยู่ในคิว";
            break;
        case "delivery":
            text = "กำลังจัดส่ง";
            break;
        default: 
            text = "ไม่ทราบสถานะ";
            break;
    }
    return (
        <span>{text}</span>
    )
}