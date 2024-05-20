Route::get('/', 'index')->name('index');
    Route::get('/create', 'create')->name('create');
    Route::get('/{id}', 'show')->name('show');
    Route::get('/{id}/edit', 'edit')->name('edit');
    Route::post('/store', 'store')->name('store');
    Route::patch('/{id}/update', 'update')->name('update');
    Route::delete('/{id}/destroy', 'destroy')->name('destroy');
switch ($user->role) {
            case 'admin':
                return redirect()->route('admin.index');
            case 'teacher':
                return redirect()->route('teacher.index');
            case 'student':
                return redirect()->route('students.index');
            default:
                return redirect()->route('dashboard');
            }
<div className="mt-4">
                    <InputLabel htmlFor="role" value="Role" />

                    <select
                        id="role"
                        name="role"
                        value={data.role}
                        className="mt-1 block w-full"
                        onChange={(e) => setData('role', e.target.value)}
                        required
                    >
                        <option value="student">Student</option>
                        <option value="teacher">Teacher</option>
                        {/* <option value="admin">Admin</option> */}
                    </select>

                    <InputError message={errors.role} className="mt-2" />
                </div>
