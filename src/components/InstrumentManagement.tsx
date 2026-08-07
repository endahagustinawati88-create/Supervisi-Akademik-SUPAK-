import React, { useState } from 'react';
import { InstrumentCategory, InstrumentItem, InstrumentSubItem } from '../types';
import { Plus, Trash2, Edit2, ChevronDown, ChevronRight, Save, X } from 'lucide-react';
import { cn } from '../utils';

interface InstrumentManagementProps {
  instruments: InstrumentCategory[];
  onUpdate: (instruments: InstrumentCategory[]) => void;
}

export default function InstrumentManagement({ instruments, onUpdate }: InstrumentManagementProps) {
  const [expandedCats, setExpandedCats] = useState<Record<string, boolean>>({});
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});

  const toggleCat = (id: string) => setExpandedCats(prev => ({ ...prev, [id]: !prev[id] }));
  const toggleItem = (id: string) => setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));

  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  // Category Actions
  const addCategory = () => {
    const id = `cat-${Date.now()}`;
    onUpdate([...instruments, { id, category: 'Kategori Baru', items: [] }]);
    setEditingId(id);
    setEditValue('Kategori Baru');
  };

  const updateCategoryName = (id: string, newName: string) => {
    onUpdate(instruments.map(c => c.id === id ? { ...c, category: newName } : c));
    setEditingId(null);
  };

  const deleteCategory = (id: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus kategori ini beserta isinya?')) {
      onUpdate(instruments.filter(c => c.id !== id));
    }
  };

  // Item Actions
  const addItem = (catId: string) => {
    const id = `${Date.now()}`; // Just timestamp for id
    onUpdate(instruments.map(c => {
      if (c.id === catId) {
        return { ...c, items: [...c.items, { id, text: 'Item Baru' }] };
      }
      return c;
    }));
    setExpandedCats(prev => ({ ...prev, [catId]: true }));
    setEditingId(id);
    setEditValue('Item Baru');
  };

  const updateItemText = (catId: string, itemId: string, newText: string) => {
    onUpdate(instruments.map(c => {
      if (c.id === catId) {
        return { ...c, items: c.items.map(i => i.id === itemId ? { ...i, text: newText } : i) };
      }
      return c;
    }));
    setEditingId(null);
  };

  const deleteItem = (catId: string, itemId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      onUpdate(instruments.map(c => {
        if (c.id === catId) {
          return { ...c, items: c.items.filter(i => i.id !== itemId) };
        }
        return c;
      }));
    }
  };

  // SubItem Actions
  const addSubItem = (catId: string, itemId: string) => {
    const id = `${Date.now()}a`;
    onUpdate(instruments.map(c => {
      if (c.id === catId) {
        return {
          ...c, items: c.items.map(i => {
            if (i.id === itemId) {
              const subItems = i.subItems || [];
              return { ...i, subItems: [...subItems, { id, text: 'Sub-item Baru' }] };
            }
            return i;
          })
        };
      }
      return c;
    }));
    setExpandedItems(prev => ({ ...prev, [itemId]: true }));
    setEditingId(id);
    setEditValue('Sub-item Baru');
  };

  const updateSubItemText = (catId: string, itemId: string, subId: string, newText: string) => {
    onUpdate(instruments.map(c => {
      if (c.id === catId) {
        return {
          ...c, items: c.items.map(i => {
            if (i.id === itemId && i.subItems) {
              return { ...i, subItems: i.subItems.map(s => s.id === subId ? { ...s, text: newText } : s) };
            }
            return i;
          })
        };
      }
      return c;
    }));
    setEditingId(null);
  };

  const deleteSubItem = (catId: string, itemId: string, subId: string) => {
    if (confirm('Apakah Anda yakin ingin menghapus sub-item ini?')) {
      onUpdate(instruments.map(c => {
        if (c.id === catId) {
          return {
            ...c, items: c.items.map(i => {
              if (i.id === itemId && i.subItems) {
                return { ...i, subItems: i.subItems.filter(s => s.id !== subId) };
              }
              return i;
            })
          };
        }
        return c;
      }));
    }
  };

  const startEdit = (id: string, initialValue: string) => {
    setEditingId(id);
    setEditValue(initialValue);
  };

  return (
    <div className="space-y-6 mt-4">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-bold text-slate-800">Manajemen Instrumen Supervisi</h3>
          <p className="text-slate-500 text-sm">Sesuaikan aspek dan indikator penilaian supervisi.</p>
        </div>
        <button
          onClick={addCategory}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Kategori Baru
        </button>
      </div>

      <div className="space-y-4">
        {instruments.map(cat => (
          <div key={cat.id} className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
            {/* Category Header */}
            <div className="bg-slate-50 px-4 py-3 flex items-center justify-between border-b border-slate-200 group">
              <div className="flex items-center gap-3 flex-1">
                <button onClick={() => toggleCat(cat.id)} className="p-1 hover:bg-slate-200 rounded text-slate-500">
                  {expandedCats[cat.id] ? <ChevronDown className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />}
                </button>
                {editingId === cat.id ? (
                  <div className="flex items-center gap-2 flex-1 max-w-md">
                    <input
                      type="text"
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="w-full px-2 py-1 text-sm border border-indigo-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                      autoFocus
                    />
                    <button onClick={() => updateCategoryName(cat.id, editValue)} className="text-green-600 hover:bg-green-50 p-1 rounded">
                      <Save className="w-4 h-4" />
                    </button>
                    <button onClick={() => setEditingId(null)} className="text-slate-500 hover:bg-slate-200 p-1 rounded">
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <h4 className="font-bold text-slate-800 text-lg cursor-pointer" onDoubleClick={() => startEdit(cat.id, cat.category)}>
                    {cat.category}
                  </h4>
                )}
              </div>
              <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <button onClick={() => addItem(cat.id)} className="text-xs flex items-center gap-1 bg-white border border-slate-300 text-slate-600 hover:text-indigo-600 hover:border-indigo-300 px-2 py-1 rounded shadow-sm">
                  <Plus className="w-3 h-3" /> Tambah Item
                </button>
                <button onClick={() => startEdit(cat.id, cat.category)} className="p-1.5 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded">
                  <Edit2 className="w-4 h-4" />
                </button>
                <button onClick={() => deleteCategory(cat.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Items */}
            {expandedCats[cat.id] && (
              <div className="divide-y divide-slate-100 p-2">
                {cat.items.length === 0 && (
                  <div className="text-center p-4 text-sm text-slate-400 italic">Belum ada item penilaian.</div>
                )}
                {cat.items.map(item => (
                  <div key={item.id} className="p-3">
                    <div className="flex items-start gap-3 group/item">
                      <div className="mt-0.5">
                        {item.subItems ? (
                          <button onClick={() => toggleItem(item.id)} className="p-0.5 hover:bg-slate-100 rounded text-slate-400">
                            {expandedItems[item.id] ? <ChevronDown className="w-4 h-4" /> : <ChevronRight className="w-4 h-4" />}
                          </button>
                        ) : (
                          <div className="w-5" />
                        )}
                      </div>
                      
                      {editingId === item.id ? (
                        <div className="flex items-center gap-2 flex-1">
                          <input
                            type="text"
                            value={editValue}
                            onChange={(e) => setEditValue(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-indigo-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                            autoFocus
                          />
                          <button onClick={() => updateItemText(cat.id, item.id, editValue)} className="text-green-600 hover:bg-green-50 p-1 rounded">
                            <Save className="w-4 h-4" />
                          </button>
                          <button onClick={() => setEditingId(null)} className="text-slate-500 hover:bg-slate-200 p-1 rounded">
                            <X className="w-4 h-4" />
                          </button>
                        </div>
                      ) : (
                        <div className="flex-1 flex gap-2">
                          <span className="font-bold text-slate-500 text-sm">{item.id}.</span>
                          <p className="text-sm text-slate-700 cursor-pointer flex-1" onDoubleClick={() => startEdit(item.id, item.text)}>{item.text}</p>
                        </div>
                      )}
                      
                      <div className="flex items-center gap-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                        <button onClick={() => addSubItem(cat.id, item.id)} className="text-xs flex items-center gap-1 bg-slate-50 border border-slate-200 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 px-2 py-1 rounded">
                          <Plus className="w-3 h-3" /> Sub
                        </button>
                        <button onClick={() => startEdit(item.id, item.text)} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded">
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button onClick={() => deleteItem(cat.id, item.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>

                    {/* SubItems */}
                    {item.subItems && expandedItems[item.id] && (
                      <div className="mt-2 ml-8 space-y-2 border-l-2 border-slate-100 pl-4 py-1">
                        {item.subItems.map(sub => (
                          <div key={sub.id} className="flex items-start gap-3 group/sub">
                            {editingId === sub.id ? (
                              <div className="flex items-center gap-2 flex-1">
                                <input
                                  type="text"
                                  value={editValue}
                                  onChange={(e) => setEditValue(e.target.value)}
                                  className="w-full px-2 py-1 text-sm border border-indigo-300 rounded focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                  autoFocus
                                />
                                <button onClick={() => updateSubItemText(cat.id, item.id, sub.id, editValue)} className="text-green-600 hover:bg-green-50 p-1 rounded">
                                  <Save className="w-4 h-4" />
                                </button>
                                <button onClick={() => setEditingId(null)} className="text-slate-500 hover:bg-slate-200 p-1 rounded">
                                  <X className="w-4 h-4" />
                                </button>
                              </div>
                            ) : (
                              <p className="text-sm text-slate-600 cursor-pointer flex-1" onDoubleClick={() => startEdit(sub.id, sub.text)}>{sub.text}</p>
                            )}
                            
                            <div className="flex items-center gap-1 opacity-0 group-hover/sub:opacity-100 transition-opacity">
                              <button onClick={() => startEdit(sub.id, sub.text)} className="p-1 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded">
                                <Edit2 className="w-3.5 h-3.5" />
                              </button>
                              <button onClick={() => deleteSubItem(cat.id, item.id, sub.id)} className="p-1 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded">
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
