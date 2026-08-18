import React, { useState } from 'react';
import {
  X,
  ExternalLink,
  Github,
  CheckCircle2,
  Layers,
  ShoppingBag,
  Database,
  Search,
  Filter,
  Plus,
  Trash2,
  Laptop,
  Play,
  Gamepad2,
  RotateCcw,
  Sparkles,
  Trophy,
  Shuffle,
} from 'lucide-react';
import { ProjectItem } from '../types';

interface ProjectModalProps {
  project: ProjectItem | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'interactiveDemo' | 'code'>('overview');

  // Mini Interactive State for E-Commerce Demo
  const [cartCount, setCartCount] = useState<number>(0);
  const [selectedShoeCategory, setSelectedShoeCategory] = useState<string>('all');

  // Mini Interactive State for Student Management System Demo
  const [studentList, setStudentList] = useState<Array<{ id: string; name: string; course: string; gpa: string }>>([
    { id: 'SVU-2024-001', name: 'Shibshankar Mondal', course: 'BCA (2nd Year)', gpa: '9.2' },
    { id: 'SVU-2024-042', name: 'Rahul Sharma', course: 'BCA (2nd Year)', gpa: '8.7' },
    { id: 'SVU-2024-108', name: 'Priya Mukherjee', course: 'BCA (2nd Year)', gpa: '9.4' },
  ]);
  const [newStudentName, setNewStudentName] = useState<string>('');
  const [newStudentCourse, setNewStudentCourse] = useState<string>('BCA');

  // Mini Interactive State for Block Slide Game Demo
  const [puzzleTiles, setPuzzleTiles] = useState<(number | null)[]>([1, 2, 3, 4, 5, 6, 7, null, 8]);
  const [slideMoves, setSlideMoves] = useState<number>(0);
  const [isPuzzleSolved, setIsPuzzleSolved] = useState<boolean>(false);

  const handleTileClick = (index: number) => {
    const emptyIndex = puzzleTiles.indexOf(null);
    if (emptyIndex === -1) return;

    const row = Math.floor(index / 3);
    const col = index % 3;
    const emptyRow = Math.floor(emptyIndex / 3);
    const emptyCol = emptyIndex % 3;

    // Check if adjacent
    const isAdjacent = Math.abs(row - emptyRow) + Math.abs(col - emptyCol) === 1;
    if (!isAdjacent) return;

    const newTiles = [...puzzleTiles];
    newTiles[emptyIndex] = newTiles[index];
    newTiles[index] = null;
    setPuzzleTiles(newTiles);
    setSlideMoves((m) => m + 1);

    // Check win condition (1,2,3,4,5,6,7,8,null)
    const solved = newTiles.slice(0, 8).every((val, idx) => val === idx + 1);
    if (solved && newTiles[8] === null) {
      setIsPuzzleSolved(true);
    }
  };

  const handleShufflePuzzle = () => {
    let cur = [1, 2, 3, 4, 5, 6, 7, 8, null];
    let prevEmpty = -1;
    for (let step = 0; step < 24; step++) {
      const emptyIdx = cur.indexOf(null);
      const emptyR = Math.floor(emptyIdx / 3);
      const emptyC = emptyIdx % 3;
      const neighbors: number[] = [];

      if (emptyR > 0) neighbors.push(emptyIdx - 3);
      if (emptyR < 2) neighbors.push(emptyIdx + 3);
      if (emptyC > 0) neighbors.push(emptyIdx - 1);
      if (emptyC < 2) neighbors.push(emptyIdx + 1);

      const validNeighbors = neighbors.filter((n) => n !== prevEmpty);
      const chosen = validNeighbors.length > 0 ? validNeighbors[Math.floor(Math.random() * validNeighbors.length)] : neighbors[0];
      prevEmpty = emptyIdx;

      cur[emptyIdx] = cur[chosen];
      cur[chosen] = null;
    }
    setPuzzleTiles(cur);
    setSlideMoves(0);
    setIsPuzzleSolved(false);
  };

  const handleResetPuzzle = () => {
    setPuzzleTiles([1, 2, 3, 4, 5, 6, 7, null, 8]);
    setSlideMoves(0);
    setIsPuzzleSolved(false);
  };

  if (!project) return null;

  const handleAddStudent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newStudentName.trim()) return;
    const newId = `SVU-2024-${Math.floor(100 + Math.random() * 900)}`;
    const randomGpa = (8.0 + Math.random() * 1.8).toFixed(1);
    setStudentList((prev) => [
      ...prev,
      { id: newId, name: newStudentName.trim(), course: newStudentCourse, gpa: randomGpa },
    ]);
    setNewStudentName('');
  };

  const handleDeleteStudent = (id: string) => {
    setStudentList((prev) => prev.filter((s) => s.id !== id));
  };

  const sampleShoes = [
    { id: 1, name: 'AeroGlide Pro Runner', category: 'running', price: '$129', tag: 'Best Seller' },
    { id: 2, name: 'UrbanStreet High Tops', category: 'sneakers', price: '$95', tag: 'Popular' },
    { id: 3, name: 'TrailForce Explorer', category: 'outdoor', price: '$145', tag: 'New' },
  ];

  const filteredShoes =
    selectedShoeCategory === 'all'
      ? sampleShoes
      : sampleShoes.filter((s) => s.category === selectedShoeCategory);

  return (
    <div
      id="project-detail-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        id="project-detail-modal-card"
        className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
          <div className="flex items-center gap-3">
            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-indigo-100 dark:bg-indigo-950/70 text-indigo-700 dark:text-indigo-300 border border-indigo-200 dark:border-indigo-800">
              {project.badge}
            </span>
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              {project.title}
            </h3>
          </div>
          <button
            id="close-project-modal-btn"
            onClick={onClose}
            aria-label="Close project modal"
            className="p-2 rounded-xl text-slate-500 hover:text-slate-800 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 px-6 pt-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
          <button
            onClick={() => setActiveTab('overview')}
            className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors ${
              activeTab === 'overview'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Project Details
          </button>
          <button
            onClick={() => setActiveTab('interactiveDemo')}
            className={`pb-3 text-xs sm:text-sm font-semibold border-b-2 transition-colors flex items-center gap-1.5 ${
              activeTab === 'interactiveDemo'
                ? 'border-indigo-600 text-indigo-600 dark:text-indigo-400'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <Play className="w-3.5 h-3.5" />
            <span>Interactive Simulator</span>
          </button>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 text-sm text-slate-600 dark:text-slate-300">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Project Image Banner */}
              {project.imageUrl && (
                <div className="w-full h-44 sm:h-52 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-slate-800 shadow-md">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent flex items-end p-4">
                    <span className="text-white text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/60 backdrop-blur-sm border border-white/20">
                      {project.title}
                    </span>
                  </div>
                </div>
              )}

              {/* Description */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  About the Project
                </h4>
                <p className="text-slate-700 dark:text-slate-300 leading-relaxed text-sm sm:text-base">
                  {project.fullDescription}
                </p>
              </div>

              {/* Technologies Used */}
              <div className="space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Technologies Used
                </h4>
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 text-xs font-medium rounded-lg bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 border border-indigo-200/80 dark:border-indigo-800/80"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Key Features & Architecture
                </h4>
                <div className="grid grid-cols-1 gap-2.5">
                  {project.features.map((feature, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800"
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-500 mt-0.5 shrink-0" />
                      <span className="text-slate-700 dark:text-slate-200 text-xs sm:text-sm">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'interactiveDemo' && (
            <div className="space-y-4">
              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-xs text-indigo-900 dark:text-indigo-200 flex items-center justify-between">
                <span>⚡ Live mini-sandbox preview for {project.title}</span>
                <span className="font-mono text-[10px] bg-indigo-200 dark:bg-indigo-900 px-2 py-0.5 rounded">
                  Interactive Mode
                </span>
              </div>

              {/* Specific interactive mini-sandboxes per project */}
              {project.id === 'ecommerce' && (
                <div className="space-y-4 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <ShoppingBag className="w-5 h-5 text-indigo-500" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        StepStyle Store Showcase
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-xs font-semibold">
                      <span>Cart:</span>
                      <span className="text-indigo-600 dark:text-indigo-400 font-bold">{cartCount} items</span>
                    </div>
                  </div>

                  {/* Filter pills */}
                  <div className="flex gap-2 text-xs">
                    {['all', 'running', 'sneakers', 'outdoor'].map((cat) => (
                      <button
                        key={cat}
                        onClick={() => setSelectedShoeCategory(cat)}
                        className={`px-3 py-1 rounded-lg capitalize font-medium ${
                          selectedShoeCategory === cat
                            ? 'bg-indigo-600 text-white'
                            : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700'
                        }`}
                      >
                        {cat}
                      </button>
                    ))}
                  </div>

                  {/* Sample Shoe Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {filteredShoes.map((shoe) => (
                      <div
                        key={shoe.id}
                        className="bg-white dark:bg-slate-900 p-3 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2"
                      >
                        <div className="h-20 rounded-lg bg-gradient-to-tr from-slate-200 to-indigo-100 dark:from-slate-800 dark:to-indigo-950/60 flex items-center justify-center text-xs text-slate-500 font-medium">
                          👟 {shoe.tag}
                        </div>
                        <div>
                          <p className="font-bold text-xs text-slate-900 dark:text-white truncate">
                            {shoe.name}
                          </p>
                          <p className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                            {shoe.price}
                          </p>
                        </div>
                        <button
                          onClick={() => setCartCount((c) => c + 1)}
                          className="w-full py-1 text-xs font-medium rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white transition-colors"
                        >
                          + Add to Cart
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {project.id === 'student-mgmt' && (
                <div className="space-y-4 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Database className="w-5 h-5 text-indigo-500" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        Student Records Database (SVU Barrackpore)
                      </span>
                    </div>
                    <span className="text-xs text-slate-500 font-mono">
                      {studentList.length} Records
                    </span>
                  </div>

                  {/* Add record form */}
                  <form onSubmit={handleAddStudent} className="flex gap-2 text-xs">
                    <input
                      type="text"
                      placeholder="Student Name (e.g. Ankit Roy)"
                      value={newStudentName}
                      onChange={(e) => setNewStudentName(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-white focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white font-medium flex items-center gap-1"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </form>

                  {/* Table */}
                  <div className="max-h-40 overflow-y-auto rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
                    <table className="w-full text-left text-xs">
                      <thead className="bg-slate-100 dark:bg-slate-800 text-slate-500">
                        <tr>
                          <th className="p-2">Roll No</th>
                          <th className="p-2">Name</th>
                          <th className="p-2">Course</th>
                          <th className="p-2">GPA</th>
                          <th className="p-2 text-right">Action</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                        {studentList.map((st) => (
                          <tr key={st.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                            <td className="p-2 font-mono text-[11px] text-slate-500">{st.id}</td>
                            <td className="p-2 font-medium text-slate-900 dark:text-white">{st.name}</td>
                            <td className="p-2 text-slate-600 dark:text-slate-300">{st.course}</td>
                            <td className="p-2 font-bold text-emerald-600 dark:text-emerald-400">{st.gpa}</td>
                            <td className="p-2 text-right">
                              <button
                                onClick={() => handleDeleteStudent(st.id)}
                                className="p-1 text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {(project.id === 'block-slide' || project.id === 'block-slide-game') && (
                <div className="space-y-4 border border-purple-200 dark:border-purple-900/50 rounded-2xl p-5 bg-gradient-to-br from-purple-50/70 via-slate-50 to-indigo-50/50 dark:from-purple-950/30 dark:via-slate-900/50 dark:to-indigo-950/20">
                  <div className="flex items-center justify-between pb-3 border-b border-purple-100 dark:border-purple-900/40">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-lg bg-purple-600 text-white shadow-sm">
                        <Gamepad2 className="w-4 h-4" />
                      </div>
                      <div>
                        <h5 className="font-bold text-xs sm:text-sm text-slate-900 dark:text-white">
                          Interactive {project.id === 'block-slide' ? '2248 Block Slide' : 'Block Slide'} Game
                        </h5>
                        <p className="text-[11px] text-slate-500">
                          Click adjacent tiles to slide them into the blank slot.
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right font-mono">
                        <span className="text-[11px] text-slate-400 block">Moves</span>
                        <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                          {slideMoves}
                        </span>
                      </div>
                      <div className="flex gap-1.5">
                        <button
                          onClick={handleShufflePuzzle}
                          title="Shuffle board"
                          className="px-2.5 py-1.5 rounded-lg text-xs font-semibold bg-purple-600 hover:bg-purple-500 text-white flex items-center gap-1 shadow-sm transition-transform active:scale-95 cursor-pointer"
                        >
                          <Shuffle className="w-3 h-3" />
                          <span>Shuffle</span>
                        </button>
                        <button
                          onClick={handleResetPuzzle}
                          title="Reset puzzle"
                          className="p-1.5 rounded-lg text-xs bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors cursor-pointer"
                        >
                          <RotateCcw className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Solved celebration banner */}
                  {isPuzzleSolved && (
                    <div className="p-3 rounded-xl bg-emerald-100/90 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-700 text-emerald-800 dark:text-emerald-200 text-xs flex items-center justify-between animate-in zoom-in-95 duration-200">
                      <div className="flex items-center gap-2">
                        <Trophy className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                        <span className="font-semibold">
                          Awesome! You solved the Block Slide puzzle in {slideMoves} moves!
                        </span>
                      </div>
                      <button
                        onClick={handleShufflePuzzle}
                        className="px-2.5 py-1 rounded-lg bg-emerald-600 text-white text-[11px] font-bold hover:bg-emerald-500"
                      >
                        Play Again
                      </button>
                    </div>
                  )}

                  {/* 3x3 Tile Grid */}
                  <div className="flex justify-center py-2">
                    <div className="w-64 h-64 p-2.5 bg-slate-900 rounded-2xl shadow-xl grid grid-cols-3 gap-2 border-2 border-purple-500/30">
                      {puzzleTiles.map((tile, idx) => {
                        const emptyIdx = puzzleTiles.indexOf(null);
                        const row = Math.floor(idx / 3);
                        const col = idx % 3;
                        const emptyR = Math.floor(emptyIdx / 3);
                        const emptyC = emptyIdx % 3;
                        const isMovable = Math.abs(row - emptyR) + Math.abs(col - emptyC) === 1;

                        if (tile === null) {
                          return (
                            <div
                              key="empty"
                              className="w-full h-full rounded-xl bg-slate-950/80 border border-purple-500/10 flex items-center justify-center"
                            >
                              <span className="w-2 h-2 rounded-full bg-purple-500/30" />
                            </div>
                          );
                        }

                        return (
                          <button
                            key={tile}
                            onClick={() => handleTileClick(idx)}
                            disabled={!isMovable}
                            className={`w-full h-full rounded-xl font-mono text-lg font-extrabold flex items-center justify-center transition-all duration-150 select-none shadow-md ${
                              isMovable
                                ? 'bg-gradient-to-br from-purple-500 via-indigo-600 to-purple-700 text-white cursor-pointer hover:scale-105 active:scale-95 shadow-purple-500/30 hover:ring-2 hover:ring-purple-300'
                                : 'bg-gradient-to-br from-slate-800 to-slate-700 text-slate-300 cursor-default opacity-90'
                            }`}
                          >
                            {tile}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-purple-100 dark:border-purple-900/40">
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 text-center sm:text-left">
                      💡 Target: Arrange numbers <strong>1 to 8</strong> with empty slot at bottom-right.
                    </p>
                    <a
                      href={project.liveDemoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-white bg-purple-600 hover:bg-purple-500 transition-colors shadow-sm cursor-pointer shrink-0"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Launch Full App in AI Studio</span>
                    </a>
                  </div>
                </div>
              )}

              {project.id === 'portfolio' && (
                <div className="space-y-4 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 bg-slate-50 dark:bg-slate-800/50">
                  <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-center gap-2">
                      <Laptop className="w-5 h-5 text-indigo-500" />
                      <span className="font-bold text-slate-900 dark:text-white">
                        Portfolio Architecture
                      </span>
                    </div>
                  </div>
                  <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
                    <p className="font-mono text-slate-700 dark:text-slate-300">
                      ✓ Single-Page Application with smooth section anchoring
                    </p>
                    <p className="font-mono text-slate-700 dark:text-slate-300">
                      ✓ Dark & Light mode switcher with persistent localStorage
                    </p>
                    <p className="font-mono text-slate-700 dark:text-slate-300">
                      ✓ Zero bloat, responsive Tailwind CSS mobile-first grid
                    </p>
                    <p className="font-mono text-slate-700 dark:text-slate-300">
                      ✓ Interactive resume viewer & form validation engine
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/90">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            Close
          </button>
          <div className="flex items-center gap-2">
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-slate-800 dark:text-slate-200 bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
            >
              <Github className="w-4 h-4" />
              <span>GitHub Repo</span>
            </a>
            <a
              href={project.liveDemoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold text-white bg-indigo-600 hover:bg-indigo-500 transition-colors shadow-sm"
            >
              <ExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
