
import './AppHeader.scss'
import { useEffect, useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom'
import { eventBus } from '../../services/eventBusService.js';
import { storageService } from '../../services/storageService';
import search from '../../assets/icons/search.png'
import { Dropdown } from 'element-react';
// import { Button } from 'element-react';
import 'element-theme-default';
function _AppHeader(props) {
    useEffect(() => {
        console.log('effect');
        eventBus.on('details mounted', () => {
            console.log('Details is now mounted');
        })
    }, [])

    var [className, setClassName] = useState('none')
    var [term, setTerm] = useState('')

    const toHome = () => {
        props.history.push('/')
    }
    let last_known_scroll_position = 0;
    let ticking = false;

    function doSomething(scroll_pos) {
        if (scroll_pos > 125) {
            setClassName('flex')
        }
        if (scroll_pos < 125) {
            setClassName('none')
        }
    }

    document.addEventListener('scroll', function (e) {
        last_known_scroll_position = window.scrollY;
        if (!ticking) {
            window.requestAnimationFrame(function () {
                doSomething(last_known_scroll_position);
                ticking = false;
            });

            ticking = true;
        }
    });
    const handleTerm = ({ target }) => {
        setTerm(target.value)
    }
    const searchByTerm = (ev) => {
        ev.preventDefault()
        props.history.push(`/recipe?term=${term}`)
    }
    return (
        <section className="app-header flex space-between align-center full">
            <p className="hover-pointer logo" onClick={toHome}>delicious</p>
            {/* <NavLink className="hover-pointer logo" to="/">delicious</NavLink> */}

            <form className={className + ' filter align-center'} onSubmit={searchByTerm}>
                <input name="term" placeholder="Free Search" value={term} type="text" onChange={handleTerm} />
                <img onClick={searchByTerm} src={search} alt="" />
            </form>

            <nav className="main-nav flex" >
                <NavLink to="/recipe/edit">Add Recipe!</NavLink>
                <NavLink exact to="/recipe">Recipes List</NavLink>
            </nav>
            {/* <Button type="primary">Hello</Button> */}
            <Dropdown className="main-nav-mobile" menu={(
                <Dropdown.Menu>
                    <Dropdown.Item><NavLink exact to="/recipe">Recipes List</NavLink></Dropdown.Item>
                    <Dropdown.Item><NavLink to="/recipe/edit">Add Recipe!</NavLink></Dropdown.Item>
                </Dropdown.Menu>
            )}
            >
                <span className="el-dropdown-link">
                    <i className="el-icon-caret-bottom el-icon--right"></i>
                </span>
            </Dropdown>
        </section>
    )
}
export const AppHeader = withRouter(_AppHeader)


// class _AppHeader extends Component {
//     componentDidMount() {
//         eventBus.on('details mounted', () => {
//             console.log('Details is now mounted');
//         })
//     }
//     toHome = () => {
//         this.props.history.push('/')
//     }
//     render() {
//         return (
//             <section className="app-header flex space-between align-center full">
//                 <p className="hover-pointer logo" onClick={this.toHome}>mister bitcoin</p>
//                 <nav className="main-nav flex" >
//                     <NavLink to="/signup">{storageService.load('CURR_USER') ? 'logout' : 'signup'}</NavLink>
//                     <NavLink to="/recipe">Recipes List</NavLink>
//                     <NavLink to="/statistic">Statistic charts</NavLink>
//                 </nav>
//             </section>
//         )
//     }
// }
// export const AppHeader = withRouter(_AppHeader)

