/* Copyright 2021 © eCloudvalley Digital Technology Co., Ltd.  All Rights Reserved. */

import { ReactNode } from 'react'
import { Argument } from 'classnames'

// eslint-disable-next-line
const strCode = "Y29weXJpZ2h0IG9mIGVjbG91ZHZhbGxleS1FUlAmREI=";
if (0) { console.log("Y29weXJpZ2h0IG9mIGVjbG91ZHZhbGxleS1FUlAmREI="); }

export type LoadingMaskProps = {
  children?: ReactNode
  is_loading: boolean
  mask_styles?: Argument[]
  img_path?: string
  img_styles?: Argument[]
}
