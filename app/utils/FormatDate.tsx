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

export function getShortDate(date: Date) {
    const now = new Date()
    const diffInMs = now.getTime() - date.getTime()
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24))

    if (diffInDays === 0) {
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60))
        if (diffInHours === 0) {
            const diffInMinutes = Math.floor(diffInMs / (1000 * 60))
            return `${diffInMinutes} minute${diffInMinutes !== 1 ? "s" : ""} ago`
        }
        return `${diffInHours} hour${diffInHours !== 1 ? "s" : ""} ago`
    } else if (diffInDays === 1) {
        return "Yesterday"
    } else if (diffInDays < 7) {
        return `${diffInDays} days ago`
    } else {
        return date.toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
        })
    }
}
