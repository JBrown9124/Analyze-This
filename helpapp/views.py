from django.shortcuts import render
import sys
from django.shortcuts import render
from django.http import HttpResponse
import json
from django.core import serializers
from .models import *
from django.http import JsonResponse
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import get_object_or_404, render
from django.http import HttpResponseServerError
from django.urls import reverse
from django.views.decorators.csrf import csrf_exempt
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from .firestore import db
import json
from .ResponseModels.help import Help
from .ResponseModels.location import Location
from .ResponseModels.user import User
from .Providers.analysis import Analysis

import uuid


# Create your views here.
def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


@csrf_exempt
def user(request):
    # register user
    if request.method == 'POST':

        json_data = json.loads(request.body)

        user_id = str(uuid.uuid4())
        doc_ref = db.collection(u'user').document()

        analysis = Analysis(description=json_data['description'])
        analysis_results = analysis.results()
        help_response = Help(analysis_results=analysis_results, description=json_data['description'], location=json_data['location']
                             )
        potentional_causes = analysis_results['potential_causes']
        if analysis_results['is_danger']['is_danger']:
            potentional_causes.append({'danger':'anger'})
        if analysis_results['is_suicide']['is_suicide']:
            potentional_causes.append({'suicide':'suicide'})
        for key, value in potentional_causes.items():
            collections = db.collection(
                'conflict_resources').document(value).get()
            help_response.resources = [{"name":name,"url":url}
                                       for name, url in collections._data.items()]
        response = help_response.to_dict()
        # doc_ref.set(User(json_data['name'], user_id, json_data['location'], conflict.to_dict()).to_dict())
        return JsonResponse(response)
