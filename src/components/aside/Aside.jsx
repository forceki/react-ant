import { Layout, Menu } from 'antd';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { layoutGenerator } from 'react-break';
import { SwitchCollapsed } from '../../redux/actions/layout/LayoutAction';
import items from './side';
import { RTF } from '../../helpers';
import { useNavigate } from 'react-router';

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
  const { collapsed } = useSelector((state) => state.LayoutReducer)
  const item = RTF(items)

  return (
    <>
      <OnAtLeastTablet>
        <Sider collapsible collapsed={collapsed} onCollapse={(value) => dispatch(SwitchCollapsed(value))}>
          {collapsed ?
            <img
              src="/src/assets/logo.svg"
              className="mx-auto w-[40px] my-2"
              alt="test"
            />
            :
            <div className="aspect-auto p-5">
              <img
                src='/src/assets/logo/AvaRevota.svg'
                className="w-full"
                alt="test"
              />
            </div>

          }

          <Menu
            theme='light'
            className="text-white"
            defaultSelectedKeys={['1']} mode="inline" items={items}
            onClick={(e) => {
              let index = item.find(o => o.key == e.key)
              console.log(index)
              navigate(index.routes)
            }}
          />
        </Sider>
      </OnAtLeastTablet>
    </>


  )
};
export default Aside;