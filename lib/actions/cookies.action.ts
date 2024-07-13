'use server'

import { cookies } from "next/headers";

export async function storeToCookies<T>(key: string, data: T, daysToExpire: number = 7) {
  try {
    const jsonData = JSON.stringify(data);
    const expires = new Date();
    expires.setTime(expires.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));

    cookies().set(key, jsonData, {
      path: '/',
      httpOnly: true,
      sameSite: "strict",
      secure: true,
      expires: expires,
    });
  } catch (error) {
    console.error('Store to Cookies Error:', error);
  }
}

export async function getFromCookies<T>(key: string): Promise<T | null> {
  try {
    const jsonData = cookies().get(key);
    if (jsonData && jsonData.value) {
      return JSON.parse(jsonData.value);
    }
    return null;
  } catch (error) {
    console.error('Get From Cookies Error:', error);
    return null;
  }
}