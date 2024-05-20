<?php

namespace App\Http\Controllers\Teacher;
use app\Http\Controllers\Controller;
use App\Models\Teacher;
// use App\Repositories\All\Categories\CategoryInterface;
// use App\Repositories\All\Categories\CategoryRepository;
// use App\Repositories\All\Categories\CategoryRepositoryInterface;
use Illuminate\Http\Request;
use Inertia\Inertia;


class TeacherController extends Controller
{

    public function index()
    {
        // $teachersInterface = app()->make(Teacher::class);
        // $teachers = $teachersInterface->all();
        // return Inertia::render('Teachers/All/Index', [
        //     'teachers' => $teachers
        // ]);
        $teachers=Teacher::all();
        return Inertia::render('Teachers/All/Index',['teachers'=>$teachers]);

    }

    public function create()
    {
        $data = Teacher::all();
        return Inertia::render('Teachers/Create/Index', [
            'cData' => Teacher::where('name', 'xxx')->get()
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|string|max:10',
            'name' => 'required|string|max:255',
            'subjects' => 'required|string|max:255',
        ]);

        Teacher::create([
            'user_id' => $request->user_id,
            'name' => $request->name,
            'subjects' => $request->subjects,
        ]);
        return redirect()->route('teachers.index')->with('status', 'Added Success Full!');
        $teacherInterface->create($request->all());
        redirect()->route('categories.index')->with('success', 'Teacher created successfully');
    }

    public function show($teacher)
    {
        $data = Teacher::find($teacher);

        return Inertia::render('Teachers/show/Index', ['teacher' => $data]);

    }

    public function edit(Teacher $teacher)
    {
        // $teacherInterface = app()->make(teacherInterface::class);
        // $teacherInterface->findByColumn(['name' => $id]);
    }

    public function update(Request $request, string $teacher)
    {
        $request->validate([
            'user_id' => 'required|string|max:10',
            'name' => 'required|string|max:255',
            'subjects' => 'required|string|max:255',
        ]);
        Teacher::find($teacher)->update($request->all());
        return redirect()->route('teacher.index')->with('Success', 'Updated successfully');

    }

    public function destroy($teacher)
    {
        Teacher::find($teacher)->delete();
        return redirect()->route('teacher.index')->with('Success', 'Delete successfully');
        ;
    }
}
