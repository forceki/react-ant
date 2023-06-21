import { Layout, Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { layoutGenerator } from 'react-break';
import { SwitchCollapsed } from '../../redux/actions/layout/LayoutAction';
import { side } from './side';
import { RTF } from '../../helpers';
import { useLocation, useNavigate } from 'react-router';

const { Sider } = Layout;

const layout = layoutGenerator({
  mobile: 0,
  phablet: 550,
  tablet: 768,
  desktop: 992,
});

const OnAtLeastTablet = layout.isAtLeast('tablet');

const Aside = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const location = useLocation()
  let path = location.pathname
  const { collapsed } = useSelector((state) => state.LayoutReducer)
  const user = useSelector((state) => state.SignInReducer)
  const items = user.user != null ? side(user.user.roles) : [] 

  const item = RTF(items)
  const active = item.find((e) => e.routes == path)

  const selectactive = active != undefined ? active.key.split("-") : ''
  return (
    <>
      <OnAtLeastTablet>
        <Sider collapsible collapsed={collapsed} className="overflow-auto" onCollapse={(value) => dispatch(SwitchCollapsed(value))}>
          {collapsed ?
            <img
              src="/assets/logo.svg"
              className="mx-auto w-[40px] my-2"
              alt="Revota"
            />
            :
            <div className="aspect-auto p-5">
              <img
                src='/assets/logo/AvaRevota.svg'
                className="w-full"
                alt="Revota"
              />
            </div>

          }

          <Menu
            theme='light'
            className="text-white"
            defaultOpenKeys={[selectactive[0]]}
            defaultSelectedKeys={[active?active.key: '']} mode="inline" items={items}
            onClick={(e) => {
              let index = item.find(o => o.key == e.key)
              navigate(index.routes)
            }}
          />
        </Sider>
      </OnAtLeastTablet>
    </>


  )
};
export default Aside;