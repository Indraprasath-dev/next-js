const Filter = () => {
    return (
        <div className="bg-white">
            <div className="filter__controls pt-5 pl-10 pr-7">
                <div className="filter__controls-label">Filters</div>
                <div className="filter__controls-clear">Clear Filters</div>
            </div>
            <div className="filter__controls-span"></div>
            
            <div className="member__filters pt-5 pl-10 pr-">
                <div className="filter__office-hours filter">
                    <h3 className="filter__title">Only Show Members with Office Hours</h3>
                    <label className="switch ">
                        <input type="checkbox" />
                        <span className="slider -ml-1"></span>
                    </label>
                </div>
                <div className="filter__collaboration filter">
                    <h3 className="filter__title">Open to Collaborate</h3>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="filter__friends filter">
                    <h3 className="filter__title">Include Friends of Protocol Labs</h3>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
                <div className="filter__new-members filter">
                    <h3 className="filter__title">New Members</h3>
                    <label className="switch">
                        <input type="checkbox" />
                        <span className="slider"></span>
                    </label>
                </div>
            </div>
            
            <div className="pl-10 pr-7">
                <span className="filter__span"></span>
                <h2>Region</h2>
                <div className="filter__region">
                    <div><button>Africa</button></div>
                    <div><button>Asia</button></div>
                    <div><button>Europe</button></div>
                    <div><button>North America</button></div>
                    <div><button>Not Defined</button></div>
                    <div><button>Oceania</button></div>
                    <div><button>South America</button></div>
                </div>
            </div>

            <div className="pl-10 pr-7 pb-6">
                <span className="filter__span"></span>
                <h2>Country</h2>
                <div className="filter__region">
                    <div><button>Argentina</button></div>
                    <div><button>Armenia</button></div>
                    <div><button>Australia</button></div>
                    <div><button>Belarus</button></div>
                    <div><button>Belgium</button></div>
                    <div><button>Brazil</button></div>
                    <div><button>Cambodia</button></div>
                    <div><button>Cameroon</button></div>
                    <div><button>Canada</button></div>
                    <div><button>Chile</button></div>
                </div>
            </div>
        </div>
    )
};

export default Filter;
