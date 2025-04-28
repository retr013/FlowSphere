export default function formatDate(date: Date) {
    return new Date(date).toLocaleString("en-UK", {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        timeZoneName: "short",
    })

}