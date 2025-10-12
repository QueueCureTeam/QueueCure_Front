export default function StatusBadge({status}) {
    let bgColor = "";
    let dotColor = "";
    let text = "";
    switch (status) {
        case "ready":
            bgColor = "bg-green-50 border-green-200 text-green-700"
            dotColor = "bg-green-500"
            text = "ถึงคิวแล้ว";
            break;
        case "preparing":
            bgColor = "bg-yellow-50 border-yellow-200 text-yellow-700"
            dotColor = "bg-yellow-500"
            text = "กำลังจัดเตรียม";
            break;
        case "waiting":
            bgColor = "bg-red-50 border-red-200 text-red-700"
            dotColor = "bg-red-500"
            text = "อยู่ในคิว";
            break;
    }
    return (
        <div className="text-center">
            <div className={`px-4 py-2 inline-flex items-center gap-2 justify-center justify-self-center text-sm border rounded-full animate-pulse ${bgColor}`}>
                <div className={`h-2.5 w-2.5 rounded-full ${dotColor}`}></div>
                <span>{text}</span>
            </div>
        </div>
    )
}