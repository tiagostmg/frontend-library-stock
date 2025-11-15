"use client"

import { api } from "@/utils/api"
import { useEffect } from "react"

export default function BookPage() {
    useEffect(() => {
        api.get("books")
    }, [])
    return(
        <p>Book</p>
    )
}