'use client'

export default function LoginPage() {
  // This page is no longer needed, redirect to home
  if (typeof window !== 'undefined') {
    window.location.href = '/'
  }
  return null
}
