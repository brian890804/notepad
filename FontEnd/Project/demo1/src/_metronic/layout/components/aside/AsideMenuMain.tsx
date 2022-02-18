/* eslint-disable react/jsx-no-target-blank */
import React from 'react'
import { useIntl } from 'react-intl'
import { AsideMenuItemWithSub } from './AsideMenuItemWithSub'
import { AsideMenuItem } from './AsideMenuItem'

export function AsideMenuMain() {
  const intl = useIntl()

  return (
    <>
      <AsideMenuItem
        to='/dashboard'
        icon='/media/icons/duotune/art/art002.svg'
        title={intl.formatMessage({ id: 'MENU.DASHBOARD' })}
        fontIcon='bi-app-indicator'
      />
      <AsideMenuItem
        to='/builder'
        icon='/media/icons/duotune/general/gen019.svg'
        title={intl.formatMessage({ id: 'MENU.REVISIONDASHBOARD' })}
        fontIcon='bi-layers'
      />
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>配件</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/crafted/pages'
        title={intl.formatMessage({ id: 'MENU.PAGES' })}
        fontIcon='bi-archive'
        icon='/media/icons/duotune/general/gen022.svg'
      >
        <AsideMenuItemWithSub to='/crafted/pages/wizards' title='Wizards' hasBullet={true}>
          <AsideMenuItem
            to='/crafted/pages/wizards/horizontal'
            title='Horizontal'
            hasBullet={true}
          />
          <AsideMenuItem to='/crafted/pages/wizards/vertical' title='Vertical' hasBullet={true} />
        </AsideMenuItemWithSub>
      </AsideMenuItemWithSub>
      <AsideMenuItemWithSub
        to='/crafted/widgets'
        title={intl.formatMessage({ id: 'MENU.WIDGETS' })}
        icon='/media/icons/duotune/general/gen025.svg'
        fontIcon='bi-layers'
      >
        <AsideMenuItem to='/crafted/widgets/excel' title={intl.formatMessage({ id: 'MENU.WIDGETS.EXCEL' })} hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/carousel' title={intl.formatMessage({ id: 'MENU.WIDGETS.CAROUSEL' })} hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/lists' title={intl.formatMessage({ id: 'MENU.WIDGETS.LIST' })} hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/table' title={intl.formatMessage({ id: 'MENU.WIDGETS.TABLE' })} hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/statistics' title={intl.formatMessage({ id: 'MENU.WIDGETS.STATISCICS' })} hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/charts' title={intl.formatMessage({ id: 'MENU.WIDGETS.CHART' })} hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/mixed' title={intl.formatMessage({ id: 'MENU.WIDGETS.MIXED' })} hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/tables' title={intl.formatMessage({ id: 'MENU.WIDGETS.TABLES' })} hasBullet={true} />
        <AsideMenuItem to='/crafted/widgets/feeds' title='Feeds' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content pt-8 pb-2'>
          <span className='menu-section text-muted text-uppercase fs-8 ls-1'>Apps</span>
        </div>
      </div>
      <AsideMenuItemWithSub
        to='/apps/chat'
        title='Chat'
        fontIcon='bi-chat-left'
        icon='/media/icons/duotune/communication/com012.svg'
      >
        <AsideMenuItem to='/apps/chat/drawer-chat' title='Drawer Chart' hasBullet={true} />
      </AsideMenuItemWithSub>
      <div className='menu-item'>
        <div className='menu-content'>
          <div className='separator mx-1 my-4'></div>
        </div>
      </div>

    </>
  )
}
