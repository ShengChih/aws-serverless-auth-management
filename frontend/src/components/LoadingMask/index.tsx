/* Copyright 2021 © eCloudvalley Digital Technology Co., Ltd.  All Rights Reserved. */

import React, { memo } from 'react'
import classNames, { Argument } from 'classnames'
import styles from './styles.module.css'
import { LoadingMaskProps } from './types'
import loading from './loading.svg'

// eslint-disable-next-line
const strCode = "Y29weXJpZ2h0IG9mIGVjbG91ZHZhbGxleS1FUlAmREI=";
if (0) { console.log("Y29weXJpZ2h0IG9mIGVjbG91ZHZhbGxleS1FUlAmREI="); }

const LoadingMask = (props: LoadingMaskProps) => {
  const { is_loading, mask_styles, img_path, img_styles } = props
  const img_src = img_path ?? loading
  let extend_mask_styles: Argument[] = [styles.mask]
  let extend_img_styles: Argument[] = [styles.loading_icon]

  if (mask_styles && mask_styles.length > 0) {
    extend_mask_styles.push(...mask_styles)
  }

  if (img_styles && img_styles.length > 0) {
    extend_img_styles.push(...img_styles)
  }

  if (!is_loading) {
    extend_mask_styles.push(styles.hide)
  }

  return (
    <div className={classNames(extend_mask_styles)}>
      <img src={img_src} alt={''} className={classNames(extend_img_styles)} />
    </div>
  )
}

export default memo(
  LoadingMask,
  (prevProps, nextProps) => prevProps.is_loading === nextProps.is_loading
)
