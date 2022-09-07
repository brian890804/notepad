import { useEffect } from 'react'

export default function JudeEnterWindow() {
    const reloadCount = Number(sessionStorage.getItem('reloadCount')) || 0;
    const deviceInformation = navigator.userAgent
    useEffect(() => {
        if (reloadCount < 1) {
            // alert('123')
            if (deviceInformation.indexOf("Line") !== -1) {
                window.location.href = `${window.location.href}?openExternalBrowser=1`
            } else if (deviceInformation.indexOf("FBAV") !== -1 || deviceInformation.indexOf("FBAN") !== -1) {
                alert('ccc')
                window.location.href = `googlechrom://${window.location.host}`
            }
            sessionStorage.setItem('reloadCount', String(reloadCount + 1))
            // window.open('https://www.google.com/', '_blank')
        } else {
            sessionStorage.removeItem('reloadCount');
        }
    }, [])
}