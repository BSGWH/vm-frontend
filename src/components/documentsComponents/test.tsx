export default function Widget() {
    return (
        <>
        <div className="relative inline-block text-left">
            <div>
                <button type="button" className="inline-flex justify-center w-full rounded-md border border-zinc-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-zinc-700 dark:text-zinc-200 dark:bg-zinc-800 hover:bg-zinc-50 dark:hover:bg-zinc-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" id="dropdown-menu" undefinedhaspopup="true" undefinedexpanded="true">
                    Add New Profile
                    
                    <svg className="-mr-1 ml-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" undefinedhidden="true">
                        <path fillRule="evenodd" d="M10 8l5.93 5.93a1 1 0 001.41-1.41l-6-6a1 1 0 00-1.41 0l-6 6a1 1 0 001.41 1.41L10 8z" clipRule="evenodd" />
                    </svg>
                </button>
            </div>
        
            
            <div className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-zinc-800 ring-1 ring-black ring-opacity-5 focus:outline-none hidden" role="menu" undefinedorientation="vertical" undefinedlabelledby="dropdown-menu">
                <div className="py-1" role="none">
                    <a href="#" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100" role="menuitem">Action 1</a>
                    <a href="#" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100" role="menuitem">Action 2</a>
                    <a href="#" className="block px-4 py-2 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-700 hover:text-zinc-900 dark:hover:text-zinc-100" role="menuitem">Action 3</a>
                </div>
            </div>
        </div>
        
        <div id="popup" className="fixed z-10 inset-0 overflow-y-auto hidden">
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                
                <div className="fixed inset-0 transition-opacity" undefinedhidden="true">
                    <div className="absolute inset-0 bg-zinc-500 dark:bg-zinc-900 opacity-75"></div>
                </div>
        
                
                <span className="hidden sm:inline-block sm:align-middle sm:h-screen" undefinedhidden="true">&#8203;</span>
                <div className="inline-block align-bottom bg-white dark:bg-zinc-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full" role="dialog" undefinedmodal="true" undefinedlabelledby="modal-headline">
                    <div className="bg-white dark:bg-zinc-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                            <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                <h3 className="text-lg leading-6 font-medium text-zinc-900 dark:text-zinc-200" id="modal-headline">
                                    Add New Profile
                                </h3>
                                <div className="mt-2">
                                    <p className="text-sm text-zinc-500 dark:text-zinc-300">
                                        This is the content of the popup.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="bg-zinc-50 dark:bg-zinc-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button type="button" className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 text-base font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm" id="close-popup">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
        
        <script>
            const dropdownButton = document.getElementById('dropdown-menu');
            const popup = document.getElementById('popup');
            const closeButton = document.getElementById('close-popup');
        
            dropdownButton.addEventListener('click', () => {
                popup.classList.remove('hidden');
            });
        
            closeButton.addEventListener('click', () => {
                popup.classList.add('hidden');
            }); </>
        </script>
    )
   
}