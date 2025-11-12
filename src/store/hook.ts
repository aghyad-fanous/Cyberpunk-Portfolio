import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { RootState, AppDispatch } from './index'

// ✅ نستخدمه بدل useDispatch العادية
export const useAppDispatch: () => AppDispatch = useDispatch

// ✅ نستخدمه بدل useSelector العادية
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
